const acceptedSearchOptions = ['name'];
const isSupportedSearchOption = (search: string) =>
  acceptedSearchOptions.includes(search);

export default isSupportedSearchOption;
