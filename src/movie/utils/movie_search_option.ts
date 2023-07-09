const acceptedSearchOptions = ['title'];
const isSupportedSearchOption = (search: string) =>
  acceptedSearchOptions.includes(search);

export default isSupportedSearchOption;
