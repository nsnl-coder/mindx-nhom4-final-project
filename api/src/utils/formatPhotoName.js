function formatPhotoName(photoLink) {
  if (photoLink.startsWith('http')) return photoLink
  else return process.env.BACKEND_HOST + '/images/' + photoLink
}

module.exports = formatPhotoName
