/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
//import getFoodNutrition from './getFoodNutrition';

const Edit = ( props ) => {
	const {
		attributes: { title, mediaID, mediaURL, ingredients, instructions },
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	const onChangeTitle = ( value ) => {
		setAttributes( { title: value } );
	};

	const onSelectImage = ( media ) => {
		setAttributes( {
			mediaURL: media.url,
			mediaID: media.id,
		} );
	};
	const onChangeIngredients = ( value ) => {
		getFoodNutrition( value ) ;
		setAttributes( { ingredients: value } );
	};

	const onChangeInstructions = ( value ) => {
		setAttributes( { instructions: value } );
	};

	function getFoodNutrition(value){
	

		const initials = {
		calories: 0,
		carbs: 0,
		fat: 0,
		}
		
		const caloriesData = {
		egg: {calories: 105, carbs: 42, fat:1},
		milk: {calories: 52, carbs: 33, fat:4},
		butter: {calories: 237, carbs: 2, fat:21},
		flour: {calories: 34, carbs: 83, fat:6},
		cream: {calories: 223, carbs: 3, fat:44}
		 }
		 
		 const { calories, carbs, fat } = Object.keys(caloriesData); 
		
		 //remove the tags and replace with a space then split in an array
		const items = value.toLowerCase().replace(/<[^>]+>/g, ' ').split(" ")

		// Loop over the caloriesData keys then calculate sum of cal, carbs, and fat
		let result = Object.keys(caloriesData).filter(key => items.filter(item => item === key).length).reduce((res, key) => ({ 
			calories: res.carbs + caloriesData[key].calories, 
			    carbs: res.calories + caloriesData[key].carbs, 
			fat: res.fat + caloriesData[key].fat 
			}), initials);


	
	return `Calories: ${result.calories} kcal - Carbs: ${result.carbs} gr - fat: ${result.fat} gr`; 
	};

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h1"
				placeholder={ __(
					'Write Recipe title…',
					'gutenberg-examples'
				) }
				value={ title }
				onChange={ onChangeTitle }
			/>
			<h4>{ getFoodNutrition(ingredients) }</h4>

			<table className="cooking time">
				<tbody>
					<tr>
						<td>Prep Time</td>
						<td>Cook Time</td>
						<td>Total Time</td>
					</tr>
					<tr>
						<td>15 mins</td>
						<td>15 mins</td>
						<td>30 mins</td>
					</tr>
				</tbody>
			</table>

			<div className="recipe-image">
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes="image"
					value={ mediaID }
					render={ ( { open } ) => (
						<Button
							className={
								mediaID ? 'image-button' : 'button button-large'
							}
							onClick={ open }
						>
							{ ! mediaID ? (
								__( 'Upload Image', 'gutenberg-examples' )
							) : (
								<img
									src={ mediaURL }
									alt={ __(
										'Upload Recipe Image',
										'gutenberg-examples'
									) }
								/>
							) }
						</Button>
					) }
				/>
			</div>
			<h3>{ __( 'Ingredients', 'gutenberg-examples' ) }</h3>
			<RichText
				tagName="ul"
				multiline="li"
				placeholder={ __(
					'Write a list of ingredients…',
					'gutenberg-examples'
				) }
				value={ ingredients }
				onChange={ onChangeIngredients }
				className="ingredients"
			/>
			<h3>{ __( 'Instructions', 'gutenberg-examples' ) }</h3>
			<RichText
				tagName="ol"
				multiline="li"
				className="steps"
				placeholder={ __(
					'Write the instructions…',
					'gutenberg-examples'
				) }
				value={ instructions }
				onChange={ onChangeInstructions }
			/>
		</div>
	);
};

export default Edit;
