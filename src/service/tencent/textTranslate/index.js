import dotenv from 'dotenv';
dotenv.config();
import tencentcloud from 'tencentcloud-sdk-nodejs';
import { getSelectContent } from '../../../utils/getSelectContext.js';

const TranslateClient = tencentcloud.tmt.v20180321.Client;
const client = new TranslateClient({
    credential: {
        secretId: process.env.SECRET_ID,
        secretKey: process.env.SECRET_KEY,
    },
    region: 'ap-shanghai',
});

export const textTranslate = () => {
    return new Promise(async resolve => {
        const selectContent = getSelectContent();

        client.TextTranslate({ SourceText: selectContent, Source: 'auto', Target: 'zh', ProjectId: 0 }, (err, res) => {
            console.log('translate err', err);
            console.log('translate res', res);
            resolve({
                origin: selectContent,
                result: res.TargetText,
            });
        });
    });
};
