FilePond.registerPlugin(
	
	// encodes the file as base64 data
  FilePondPluginFileEncode,
	
	// validates the size of the file
	FilePondPluginFileValidateSize,
	
	// corrects mobile image orientation
	FilePondPluginImageExifOrientation,
	
	// previews dropped images
  FilePondPluginImagePreview
);

// Select the file input and use create() to turn it into a pond
const pond = FilePond.create(
	document.querySelector('#filepond')
);

$('.filepond').on('FilePond:addfile', function (e) {
    console.log('file added event', pond.getFile().file);
	
	Papa.parse(pond.getFile().file, {
		complete: function(results) {
			console.log("Finished:", results.data);
		}
	});});
