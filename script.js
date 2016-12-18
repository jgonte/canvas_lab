(function() {

	function dom(id) {
		return document.getElementById(id);
	}

	document.addEventListener('DOMContentLoaded', function() {

		var manager = new EntityViewManager(new Canvas2D('myCanvas'), {
			entity: {
				top: 20,
				width: 100,
				height: 150,
				color: '#aaaaff',
				header: {
					color: '#ffaaaa',
					textColor: '#fff',
					font: '12px sans-serif',
					height: 20
				},
				field: { // Configuration for each of the fields
					color: '#fff',
					textColor: '#000',
					height: 20,
					selected: {
						color: '#ff0',
						textColor: '#f00',
					}
				}
			},
			connector: {
				color: '#f00'
			}			
		});

		manager.createEntityView('Entity1', [
			{
				name: 'Field1'
			},
			{
				name: 'Field2'
			}
		], {
			left: 20
		});

		manager.createEntityView('Entity2', [
			{
				name: 'Field3'
			},
			{
				name: 'Field4'
			}
		], {
			left: 200
		});

		manager.draw();

	});
	
})();