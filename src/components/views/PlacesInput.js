import PlacesAutocomplete from "react-places-autocomplete";
import React, {useState} from "react";
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import "../../styles/ui/FormField.scss";

function PlacesInput(props) {
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat:null,
        lng:null,
    })
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(ll);
        props.setLocation(value);
        props.setCoordinates(ll);
    }

    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <label className="form-input__label">Location</label>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input form-input__input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div className={"loading-places"}>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active '
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}
export default PlacesInput