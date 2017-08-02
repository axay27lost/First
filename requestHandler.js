/**
 * Created by Developer39 on 8/2/2017.
 */
import axios from 'axios';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {renderToString} from 'react-dom/server';
import {match,RouterContext} from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req,res) {
    axios.get('http://localhost:3001/books')
        .then(function (response) {
            // var myHtml=JSON.stringify(response.data);
            // res.render('index',{myHtml});

            const store=createStore(reducers,{"books":{"books":response.data}});
            const initialState=JSON.stringify(store.getState()).replace(/<\/script/g,'<\\/script').replace(/<!--/g,'<\\!--');

            const Routes={
                routes:routes,
                location:req.url
            }
            match(Routes,function (error,redirect,props) {
                if(error)
                {
                    res.status(500).send("Error Fullfeling the request");
                }
                else if(redirect)
                {
                   res.status(302,redirect.pathname+redirect.search);
                }
                else if(props)
                {
                    const reactComponent=renderToString(
                        <Provider store={store}>
                            <RouterContext {...props} />
                        </Provider>
                    )
                    res.status(200).render('index',{reactComponent,initialState});
                }
                else
                {
                    res.status(404).send('Not Found');
                }
            })
        })
        .catch(function (err) {
            console.log('# Initial Server Side Render',err);
        })
}

module.exports=handleRender;