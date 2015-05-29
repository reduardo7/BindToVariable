(function () {
	var cfg = {
		name: '$$'
	};

	function BindToVariable(idName, id) {
		var c = document.getElementById(id || idName);

		if (c) {
			var propVal = null;

			if (c instanceof HTMLInputElement) {
				// Text / Checkbox
				propVal = (c.type == 'checkbox') ? 'checked' : 'value';
			} else if (c instanceof HTMLSelectElement) {
				// Select
				propVal = 'value'//'selectedIndex';
			} else if (c instanceof HTMLTextAreaElement) {
				// TextArea
				propVal = 'value';
			} else if (c instanceof HTMLElement) {
				// Other HTML elements
				propVal = 'innerText';
			}

			if (propVal) {
				Object.defineProperty(this, idName, {
					get: function () { return c[propVal]; },
					set: function (v) { c[propVal] = v; }
				});

				var t = this,
					oc = c.onchange;

				c.onchange = function () {
					if (oc) oc.apply(c, arguments);
					t[idName] = this[propVal];
				};
			}
		}

		return c;
	}

	Object.defineProperty(Object.prototype, cfg.name, {
		value: BindToVariable
	});
})();
