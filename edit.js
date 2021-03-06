/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps, RichText, MediaUpload, MediaUploadCheck, PlainText,
	InspectorControls} from '@wordpress/block-editor';
import {PanelBody, PanelRow, ColorPalette, SelectControl, AnglePickerControl, FontSizePicker} from "@wordpress/components";
import { withState } from '@wordpress/compose';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */


// setting attributes here
export default function edit({attributes, setAttributes}) {
//export default function edit(props) {
	//let attributes = props.attributes;
	//let {attributes, setAttributes} = props;

	let divStyles = {
		theme: attributes.themeColor,
		backgroundColor: attributes.backgroundColor,
		color: attributes.textColor,
		angle: attributes.setAngle,
		font: attributes.fontSize,
	}


	return (
		<div { ...useBlockProps({style:divStyles}) }>
			<InspectorControls>
				<PanelBody title="Customization" initialOpen={open}>
					<PanelRow>
						<SelectControl
							label={__('Theme')}
							value={attributes.themeColor}
							onChange={ (theme) => { setAttributes({themeColor: theme} ) } }
							options={ [
								{value: 'light', label: 'Light Theme'},
								{value: 'dark', label: 'Dark Theme'},
							]}
						/>
					</PanelRow>
					<PanelRow>
						<FontSizePicker
							fontSizes={[
								{name: __( 'Small' ),slug: 'small',size: 12, },
								{ name: __( 'Big' ), slug: 'big', size: 26,},
    						]}
							value={ attributes.fontSize }
							onChange={ ( font ) => {setAttributes( { fontSize: font } );
							} }
						/>

					</PanelRow>
					<PanelRow>
						<p>Text Color</p>
						<ColorPalette
							label={__('Text Color')}
							value={attributes.textColor}
							onChange={(color) => {setAttributes({textColor: color})}}
							colors={[
								{name: 'Black', color: '#000000'},
								{name: 'Brown', color: '#362700'},
								{name: 'Navy', color: '#01223b'},
								{name: 'Red', color: '#3b0c01'},
								{name: 'Grey', color: '#636363'},
								{name: 'White', color: '#ffffff'},
							]}
						/>
					</PanelRow>
					<PanelRow>
						<p>Background Color</p>
						<ColorPalette
							label={__('Background Color')}
							value={attributes.backgroundColor}
							onChange={(color) => {setAttributes({backgroundColor: color})}}
							colors={[
								{name: 'Blue', color: '#c2fffd'},
								{name: 'Green', color: '#c2ffcf'},
								{name: 'Purple', color: '#d2d4fc'},
								{name: 'Pink', color: '#ffd1e7'},
								{name: 'Orange', color: '#ffe0c2'},
								{name: 'Yellow', color: '#feffc2'},
							]}
						/>
					</PanelRow>
					<PanelRow>
						<p>Angle Picker</p>
						<AnglePickerControl
							value={ attributes.setAngle }
							onChange={(angle) =>{ setAttributes({setAngle: angle})} }
						/>
				</PanelRow>
				</PanelBody>
			</InspectorControls>



			<RichText
				tagName="h2"
				value={ attributes.content}
				allowedFormats={ ['core/bold']}
				onChange={ ( content ) => setAttributes( { content } ) } // Store updated content as a block attribute
				placeholder="Title of Position"
			/>

			<RichText
				tagName="div" // The tag here is the element output and editable in the admin
				value={ attributes.quote } // Any existing content, either from the database or an attribute default
				allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
				onChange={ ( quote ) => setAttributes( { quote } ) } // Store updated content as a block attribute
				placeholder="Description of Position"// Display this text before any content has been added by the user
			/>
			<div className="quote-profile">
				<div className="photo">
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={['image']}
							onSelect={ ( img ) => setAttributes( { imgUrl: img.sizes.thumbnail.url } ) }
							render={ ({open}) => <img src={attributes.imgUrl} onClick={open}/>}
							/>
					</MediaUploadCheck>
				</div>
				<div className="text">
					<PlainText
						className="author"
						value={attributes.author}
						onChange={ ( author ) => setAttributes( { author } ) }
						placeholder="First, Last Name"
						/>

					<PlainText
						className="location"
						value={attributes.location}
						onChange={ ( location ) => setAttributes( { location } ) }
						placeholder="City, State"
					/>
					<PlainText
						className="age"
						value={attributes.age}
						onChange={ ( age ) => setAttributes( { age } ) }
						placeholder="DOB (4/15/2013)"
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>
					<PlainText
						className="hireDate"
						value={attributes.hireDate}
						onChange={ ( hireDate ) => setAttributes( { hireDate } ) }
						placeholder="Date Hired: 1/1/2015"
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>
				</div>
			</div>
		</div>
	);
}
