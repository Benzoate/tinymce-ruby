tinyMCEPopup.requireLangPack();

tinymce.PluginManager.requireLangPack('ruby');
var RubyDialog = {
	replaceNode: null,
	init : function() {
		var f = document.forms[0];

		// Get the selected contents as text and place it in the input
		var node = tinyMCEPopup.editor.selection.getNode();
		if(node.nodeName == 'RT'){
			node = RubyDialog.replaceNode = node.parentNode;
		}

		if(node.nodeName == 'RUBY'){
			RubyDialog.replaceNode = node;
			document.getElementById('main_text').innerHTML = node.childNodes[0].wholeText;
			f.rt_text.value = node.childNodes[1].innerHTML;
		}else{
			RubyDialog.replaceNode = null;
			document.getElementById('main_text').innerHTML =　tinyMCEPopup.editor.selection.getContent({format : 'text'});
			f.rt_text.value = '';
		}
	},
	remove : function(){

	},
	insert : function() {
		var f = document.forms[0];
		// Insert the ruby tag over whatever existed before.
		var tag = '<ruby>'+document.getElementById('main_text').innerHTML+'<rt>' + f.rt_text.value + '</rt></ruby>';

		if(RubyDialog.replaceNode !== null){
			var div = document.createElement('div');
			div.innerHTML = tag;
			RubyDialog.replaceNode.parentNode.replaceChild(div.firstChild, RubyDialog.replaceNode);
		}else{
			tinyMCEPopup.editor.execCommand('mceInsertContent', false, tag);
		}
		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(RubyDialog.init, RubyDialog);
