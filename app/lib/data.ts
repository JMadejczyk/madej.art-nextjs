export async function fetchPortraits() {
  try {
    console.log("Fetching revenue data...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // const data = await sql<Revenue>`SELECT * FROM revenue`;
    fetch("/data/portraits.json").then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          return res;
        });
      }
    });

    // console.log("Data fetch completed after 3 seconds.");

    // return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch photos data.");
  }
}
