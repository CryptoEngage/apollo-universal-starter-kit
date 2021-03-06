import chat from './chat';
import counter from './counter';
import post from './post';
import upload from './upload';
import user from './user';
import mailer from './mailer';
import graphqlTypes from './graphqlTypes';
import apolloEngine from './apolloEngine';
import './debug';

import Feature from './connector';

export default new Feature(chat, counter, post, upload, user, mailer, graphqlTypes, apolloEngine);
