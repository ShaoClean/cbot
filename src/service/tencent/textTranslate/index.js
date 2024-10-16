import tencentcloud from 'tencentcloud-sdk-nodejs';
import { getSelectContent } from '../../../utils/getSelectContext.js';

const TranslateClient = tencentcloud.tmt.v20180321.Client;
const client = new TranslateClient({
    credential: {
        secretId: import.meta.env.VITE_SECRET_ID,
        secretKey: import.meta.env.VITE_SECRET_KEY,
    },
    region: 'ap-shanghai',
});

export const textTranslate = () => {
    return new Promise(async resolve => {
        const selectContent = await getSelectContent();

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
