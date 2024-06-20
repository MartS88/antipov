import webpack from "webpack";
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths, BuildPlatform} from "./config/build/types/types";
import path from "path";


interface EnvVariables {
    mode?: BuildMode
    PORT?: number,
    analyzer?: boolean,
    platform?: BuildPlatform,
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development'
    const isProd = env.mode === 'production'

    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    }

    const config: webpack.Configuration = buildWebpack({
        PORT: env.PORT ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    })
    return config
};
