import React from 'react'
import './style.scss'
import { Switch, Route } from 'react-router-dom'

import Layout from '../../../components/layout/Index'
import DashboardIndex from '../dashboard/Index'
import UsersIndex from '../users/Index'
import FourOFour from '../fourOfour/Index'
import ClientIndex from '../client/Index'
import ClientCreate from '../client/Create'

const Index = () => {


    return (
        <div className="master">
            <Layout />
            <div className="main">
                <Switch>
                    <Route exact path="/admin/" component={DashboardIndex} />
                    <Route exact path="/admin/users" component={UsersIndex} />
                    <Route exact path="/admin/client" component={ClientIndex} />
                    <Route exact path="/admin/client/create" component={ClientCreate} />
                    <Route path="*" component={FourOFour} />
                </Switch>
            </div>
        </div>
    );
}

export default Index;

