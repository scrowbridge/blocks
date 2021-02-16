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
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( {attributes}) {

	let divStyles = {
		theme: attributes.theme,
	}

	return (
		<div { ...useBlockProps.save({style:divStyles}) }>
			<div className="quote-profile">
				<div className="photo">
					<img src={attributes.imgUrl} alt={'Photo of _____'}/>
			</div>
			<div className="heading">
				<h2 className="content">{ attributes.content }</h2>
			</div>
			<RichText.Content tagname="div" className="quote" value={ attributes.quote } />
			<div className="text">
				<p className="author">{attributes.author}</p>
				<p className="location">{attributes.location}</p>
				<p className="age">DOB: {attributes.age}</p>
				<p className="hireDate">Date Hired: {attributes.hireDate}</p>

			</div>
			</div>
		</div>
	);
}
