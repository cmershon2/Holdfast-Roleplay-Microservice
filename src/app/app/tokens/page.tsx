import AppLayout from "@/components/appLayout.component";
import { cookies } from "next/headers";
import ServerTokenTable from "@/components/serverTokenTable.component";

export default async function Page() {
    
    const data = await fetchServerTokens();
    

    return(
        <AppLayout>
            <section>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Manage Tokens</h1>
                <hr className="mb-14"></hr>
                
                <ServerTokenTable {...data} />

            </section>
        </AppLayout>
    )
}

async function fetchServerTokens() {

    try {
      const sessionToken = cookies().get('next-auth.session-token');

      /*
      const response = await axios.get(process.env.NEXTAUTH_URL+'/api/admin/server/token', {
        withCredentials: true,
        headers:{
          'Content-Type': 'application/json',
          'Cookie':`${sessionToken?.name}=${sessionToken?.value};`
        }
      });
      */
      

      const response = await fetch(process.env.NEXTAUTH_URL+'/api/admin/server/token', {
        headers:{
          'Content-Type': 'application/json',
          'Cookie':`${sessionToken?.name}=${sessionToken?.value};`
        },
        next: { revalidate: 1 }
      });
  
      const data = await response.json();

      // const data = response.data;
  
      return data;

    } catch (error) {
      console.error('Error fetching data:', error);
  
      return null;
    }
}
