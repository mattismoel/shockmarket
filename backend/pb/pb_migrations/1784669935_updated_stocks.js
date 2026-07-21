/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1642390859")

  // update field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "file2093472300",
    "maxSelect": 0,
    "maxSize": 50000000,
    "mimeTypes": [
      "video/mp4",
      "video/mpeg",
      "video/x-msvideo",
      "video/quicktime",
      "video/3gpp",
      "video/webm"
    ],
    "name": "video",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1642390859")

  // update field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "file2093472300",
    "maxSelect": 0,
    "maxSize": 50000000,
    "mimeTypes": [
      "video/mp4",
      "video/mpeg",
      "video/x-msvideo",
      "video/quicktime",
      "video/3gpp"
    ],
    "name": "video",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  return app.save(collection)
})
