const { useState, useEffect } = require("react");
const { default: Layout } = require("../../../components/layout");
import DataTable from 'react-data-table-component'

function Products({ product }) {
    const [data, setData] = useState(product)
    const [search, setSearch] = useState(product)
    useEffect(() => {
        setData(product)
        setSearch(product)
    }, [product], [product]);

    const columns = [
        {
            name: "No.",
            selector: (row) => row.id
        },
        {
            name: "Products",
            selector: (row) => row.title,
        },
        {
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: "rate",
            selector: (row) => row.rating.rate,
        },
        {
            name: "Images",
            cell: (row) => (
                <img
                    style={{ width: "100px", padding: "3px 0 3px 0" }}
                    src={row.image} alt={row.title}
                />
            ),
        },
        {
            name: "Actions", 
            cell: (row) => (
                <>
                    <a className='btn btn-success mx-1' href="">Like</a>
                    <a className='btn btn-danger mx-1' href="">Delete</a>
                </>
            )
        }
    ]
    function handleSearching(event) {
        const data_searching = data.filter(data => data.title.toLowerCase().includes(event.target.value.toLowerCase())); 
        setSearch(data_searching); 
    }
    return (
        <Layout products >

            <div class="container">

                <div class="row">
                    <DataTable
                        columns={columns} data={search} fixedHeader pagination title="Products"
                        actions={
                            <div className="text-end">
                                <input
                                    type="text"
                                    className="rounded border-1"
                                    style={{
                                        padding: "3px 10px",
                                        width: "300px",
                                        fontSize: "15px",
                                    }}
                                    placeholder="Search"
                                    onChange={handleSearching}
                                ></input>
                            </div>
                        }
                    >
                    </DataTable>
                </div>

            </div>

        </Layout>
    )
} export default Products;


export async function getServerSideProps() {
    const res = await fetch('https://fakestoreapi.com/products')
    const fetched = await res.json();

    return {
        props: {
            product: fetched,
        }
    }
}