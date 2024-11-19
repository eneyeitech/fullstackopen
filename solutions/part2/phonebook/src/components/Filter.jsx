const Filter = ({setSearchText, searchText}) => {
  return (
    <>
      <div>
        filter shown with
        <input
          onChange={(event) => setSearchText(event.target.value)}
          value={searchText}
        />
      </div>
      <div>search text: {searchText}</div>
    </>
  );
};

export default Filter;
