// document.write originates from John Resig,
// http://ejohn.org/blog/xhtml-documentwrite-and-adsense/
// modified to preserve markup & to write to head
document.write = function(str){

var moz = !window.opera && !/Apple/.test(navigator.vendor);
// Watch for writing out closing tags, we just
// ignore these (as we auto-generate our own)
if ( str.match(/^<\//) ) return;

// Make sure & are formatted properly, but Opera
// messes this up and just ignores it
if ( !window.opera )
str = str.replace(/&(?![#a-z0-9]+;)/g, "&amp;");

// Watch for when no closing tag is provided
// (Only does one element, quite weak)
// str = str.replace(/<([a-z]+)(.*[^\/])>$/, "<$1$2></$1>");

// Mozilla assumes that everything in XHTML innerHTML
// is actually XHTML - Opera and Safari assume that it's XML
if ( !moz )
str = str.replace(/(<[a-z]+)/g, "$1 xmlns='http://www.w3.org/1999/xhtml'");

// The HTML needs to be within a XHTML element
var div = document.createElementNS("http://www.w3.org/1999/xhtml","div");
div.innerHTML = str;

var pos = document.getElementsByTagName("head")[0];

// Add all the nodes in that position
var nodes = div.childNodes;
while ( nodes.length )
pos.appendChild( nodes[0] );

};


