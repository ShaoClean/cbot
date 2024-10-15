const config = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-case': [2, 'always', ['lower-case', 'upper-case']],
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'ci', 'build']],
        'type-empty': [2, 'never'],
        'subject-empty': [2, 'never'],
    },
};

export default config;
