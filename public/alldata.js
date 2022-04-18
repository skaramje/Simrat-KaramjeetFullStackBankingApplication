function AllData() {
  const [data, setData] = React.useState("");
  var [result, setResult] = React.useState([]);

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        for(var i in data)result.push(data[i]);
        setResult(result);
        setData(JSON.stringify(data));
      });
  }, []);

  return (
    <>
      <h5>All Users:</h5>
      
      <table className="table" data={data}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">PASSWORD</th>
            <th scope="col">BALANCE</th>
          </tr>
        </thead>
        
        <tbody>
        {result.map((item, index) => 
                <tr key={index}>
                    <th scope="row">{index +1}</th>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>${item.balance}</td>
                </tr>
            )}
        </tbody>
      </table>
    </>
  );
}
