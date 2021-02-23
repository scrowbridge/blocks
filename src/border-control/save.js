import { addFilter } from '@wordpress/hooks';
//      existing props block already has, adding to it
const addBorderProps = ( saveElementProps, blockType, attributes ) => {

	// only add if they picked a border style
	if (attributes.borderStyle){
		saveElementProps.style = saveElementProps.style || {};
		saveElementProps.style.borderStyle = attributes.borderStyle;
		saveElementProps.style.borderColor = attributes.borderColor;
		saveElementProps.style.borderWidth = attributes.borderWidth;
		saveElementProps.style.borderRadius = attributes.borderRadius;

	}
	return saveElementProps;
}

addFilter( 'blocks.getSaveContent.extraProps', 'sc-block/border-control/extra-props', addBorderProps);
