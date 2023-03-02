const buildPath = (route:string) => {
    var localPath:string = "http://localhost:2001/api" + route;
    var productionPath:string = "https://brainbeatz.xyz/api" + route;
    // var productionPath:string = "https://api.brainbeatz.xyz/api" + route;
    return (process.env.NODE_ENV === "development" ? localPath : productionPath)
};

export default buildPath;