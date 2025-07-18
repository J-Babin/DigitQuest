import { useRoutes } from 'react-router-dom';
import { routes } from '@/Router/Routes'
import { Layout } from '@/components/Layout/Layout';

function App() {
   const routing = useRoutes(routes);
    return (
        <Layout>
           {routing}
        </Layout>
    );
}

export default App;