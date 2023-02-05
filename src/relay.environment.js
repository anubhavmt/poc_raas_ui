import {urlMiddleware} from 'react-relay-network-modern';
import {initEnvironment} from '@mindtickle/relay-core';

function getMiddlewares() {
    let url = '/graphql';

    // if (process.env.NODE_ENV === 'production') {
    url = 'https://uma.staging.mindtickle.com' + '/graphql';
    // }

    return [
        urlMiddleware({
            url,
            credentials: 'include',
            mode: 'cors',
        }),
    ];
}

export function getEnvironment() {
    return initEnvironment({
        network: {
            middlewares: getMiddlewares(),
            options: {
                cacheOptions: {
                    size: 250,
                    ttl: 60 * 1000,
                    clearOnMutation: true,
                },
            },
        },
    });
}
