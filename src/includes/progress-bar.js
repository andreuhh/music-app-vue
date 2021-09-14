import NProgress from "nprogress";

export default (router) => {
    router.beforeEach((to, from, next) => {
        // to and from are both route objects. must call `next`.
        NProgress.start();
        next();
    });
    router.afterEach(NProgress.done);
}