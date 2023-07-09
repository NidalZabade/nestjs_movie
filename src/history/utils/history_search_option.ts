const acceptedSearchOptions = ['user_id', 'movie_id'];
const isSupportedSearchOption = (search: string) =>
  acceptedSearchOptions.includes(search);

export default isSupportedSearchOption;
