import { DataTable } from "@/components/ui/data-table";
import { transactionColumns } from "@/components/table-columns/transactions";
import { useState, useEffect } from "react";
import { getTransactions } from "@/app/queries/get-transactions"; 

const TransactionPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 
  const [searchQuery, setSearchQuery] = useState<string>(""); 

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null); 
      try {
        const data = await getTransactions(); 
        setTransactions(data); 
        console.log("Fetched transactions:", data); 
      } catch (err: any) {
        setError("Failed to load transactions.");
      } finally {
        setLoading(false); 
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Filtered transactions:", filteredTransactions);

  return (
    <div>
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by item name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
      </div>

      {/* Render loading or error state */}
      {loading ? (
        <div>Loading transactions...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {/* Render filtered transactions */}
          {filteredTransactions.length === 0 ? (
            <div>No transactions found</div>
          ) : (
            <DataTable columns={transactionColumns} data={filteredTransactions} />
          )}
        </>
      )}
    </div>
  );
};

export default TransactionPage;
