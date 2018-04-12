import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import theme from './autosuggestTheme.scss';
console.log(theme);
// const theme = {
//   container: {
//     position: 'relative'
//   },
//   input: {
//     width: '100%',
//     height: 30,
//     padding: '10px 20px',
//     fontFamily: 'Helvetica, sans-serif',
//     fontWeight: 300,
//     fontSize: 16,
//     border: '1px solid #aaa',
//     borderTopLeftRadius: 4,
//     borderTopRightRadius: 4,
//     borderBottomLeftRadius: 4,
//     borderBottomRightRadius: 4,
//   },
//   inputFocused: {
//     outline: 'none'
//   },
//   inputOpen: {
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0
//   },
//   suggestionsContainer: {
//     display: 'none'
//   },
//   suggestionsContainerOpen: {
//     display: 'block',
//     position: 'absolute',
//     top: 51,
//     width: 280,
//     border: '1px solid #aaa',
//     backgroundColor: '#fff',
//     fontFamily: 'Helvetica, sans-serif',
//     fontWeight: 300,
//     fontSize: 16,
//     borderBottomLeftRadius: 4,
//     borderBottomRightRadius: 4,
//     zIndex: 2
//   },
//   suggestionsList: {
//     margin: 0,
//     padding: 0,
//     listStyleType: 'none',
//   },
//   suggestion: {
//     cursor: 'pointer',
//     padding: '10px 20px'
//   },
//   suggestionHighlighted: {
//     backgroundColor: '#ddd'
//   }
// };

const possibleInput = [
  {text: 'source'},
  {text: 'website'},
  {text: 'application'}
];
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : possibleInput.filter(input =>
    input.text.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getSuggestionValue = suggestion => suggestion.text;
const renderSuggestion = suggestion => (
  <div>
    {suggestion.text}
  </div>
);

class AutoComplete extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Filter',
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          theme={theme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default AutoComplete;
