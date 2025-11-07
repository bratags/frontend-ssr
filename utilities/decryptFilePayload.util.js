import nacl from 'tweetnacl'
import { fileTypeFromBuffer } from 'file-type'

function decodeBase64Safe(b64) {
	const binary = atob(b64)
	const len = binary.length
	const bytes = new Uint8Array(len)
	for (let i = 0; i < len; i++) {
		bytes[i] = binary.charCodeAt(i)
	}
	return bytes
}
async function decryptFilePayload(payload) {
	try {
		const { key: base64Key, salt, nonce, ciphertext, keyNonce, wrappedFileKey } = payload

		const key = decodeBase64Safe(base64Key)
		const wrapped = decodeBase64Safe(wrappedFileKey)
		const knonce = decodeBase64Safe(keyNonce)

		// Try unwrapping the per-file key
		const fileKey = nacl.secretbox.open(wrapped, knonce, key)

		// If unwrap succeeded, decrypt the actual file
		const nonceBytes = decodeBase64Safe(nonce)
		const cipherBytes = decodeBase64Safe(ciphertext)
		const plaintext = nacl.secretbox.open(cipherBytes, nonceBytes, fileKey)

		if (plaintext) return plaintext

		console.warn(new Error('Unable to decrypt with any provided key'))
	} catch (err) {
		throw err
	}
}
async function decryptFile(fileObj, createObjectURL) {
	const { url, encryptedMetadata } = fileObj
	const response = await fetch(url)

	if (!response.ok) throw new Error(response)

	const ciphertext = await response.text()

	const file = await decryptFilePayload({ ciphertext, ...encryptedMetadata })

	if (!file) {
		return
	}
	const fileType = await fileTypeFromBuffer(file)
	const blob = new Blob([file], { type: fileType?.mime })

	fileObj.image = createObjectURL(blob)
}

export { decryptFilePayload, decryptFile }
