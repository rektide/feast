/* parseUri JS v0.1, by Steven Levithan (http://badassery.blogspot.com)
Splits any well-formed URI into the following parts (all are optional):
----------------------
• source (since the exec() method returns backreference 0 [i.e., the entire match] as key 0, we might as well use it)
• protocol (scheme)
• authority (includes both the domain and port)
	• domain (part of the authority; can be an IP address)
	• port (part of the authority)
• path (includes both the directory path and filename)
	• directoryPath (part of the path; supports directories with periods, and without a trailing backslash)
	• fileName (part of the path)
• query (does not include the leading question mark)
• anchor (fragment)
*/
function parseUri(sourceUri){
	var uriPartNames = ["source","protocol","authority","domain","port","path","directoryPath","fileName","query","anchor"];
	var uriParts = new RegExp("^(?:([^:/?#.]+):)?(?://)?(([^:/?#]*)(?::(\\d*))?)?((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[\\?#]|$)))*/?)?([^?#/]*))?(?:\\?([^#]*))?(?:#(.*))?").exec(sourceUri);
	var uri = {};
	
	for(var i = 0; i < 10; i++){
		uri[uriPartNames[i]] = (uriParts[i] ? uriParts[i] : "");
	}
	
	// Always end directoryPath with a trailing backslash if a path was present in the source URI
	// Note that a trailing backslash is NOT automatically inserted within or appended to the "path" key
	if(uri.directoryPath.length > 0){
		uri.directoryPath = uri.directoryPath.replace(/\/?$/, "/");
	}
	
	return uri;
}
