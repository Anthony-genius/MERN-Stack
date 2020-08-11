import express from 'express';
import { join } from 'path';

const authRouter = require('./auth');
const storageRouter = require('./storage');
const statesRouter = require('./state');
const externalOrganizationRouter = require('./organization');
const organizationRouter = require('./organization');
const assessmentRouter = require('./assessment');
const dictionaryRouter = require('./dictionaries');
const externalDictionaryRouter = require('./externalDictionaries');
const membersRouter = require('./member');
const memberSuggestionsRouter = require('./pathSuggestions');
const dashboardWidgetsRouter = require('./dashboardWidgets');

const postRouter = require('./post');
const commentRouter = require('./comment');
const tagRouter = require('./tag');

const indexRouter = express.Router();

indexRouter.use('/api/icons', express.static(join(__dirname, '../../resources/icons')));
indexRouter.use('/api/auth', authRouter);
indexRouter.use('/api/internal/me/storage', storageRouter);
indexRouter.use('/api/internal/me/state', statesRouter);
indexRouter.use('/api/external/organization', externalOrganizationRouter);
indexRouter.use('/api/internal/organization', organizationRouter);
indexRouter.use('/api/internal/assessment', assessmentRouter);
indexRouter.use('/api/external/dictionaries', externalDictionaryRouter);
indexRouter.use('/api/internal/dictionaries', dictionaryRouter);
indexRouter.use('/api/internal/member', membersRouter);
indexRouter.use('/api/internal/member/suggestions', memberSuggestionsRouter);
indexRouter.use('/api/internal/dashboard/widgets', dashboardWidgetsRouter);

indexRouter.use('/api/internal/post', postRouter);
indexRouter.use('/api/internal/comment', commentRouter);
indexRouter.use('/api/internal/tag', tagRouter);

module.exports = indexRouter;
