import { useRoutes } from 'react-router-dom';
import { routes } from '@/router/Routes'
import { Layout } from '@/components/Layout/Layout';
import { DeviceGuard } from './components/DeviceGuard';

function App() {
   const routing = useRoutes(routes);
    return (
        <DeviceGuard>
            <Layout>
                {routing}
            </Layout> 
        </DeviceGuard>
    );
}

export default App;