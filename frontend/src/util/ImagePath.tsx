// This function works a little bit differently than the standard buildPath in Path.tsx
// as it doesn't build using the API, it may be practical to rework the Path.tsx file to fit
// this into it, 
const buildPath = (route:string) => {
    var localPath:string = "http://localhost:3000" + route;
    var productionPath:string = "https://brainbeatz.xyz" + route;
    return (process.env.NODE_ENV === "development" ? localPath : productionPath)
};

export default buildPath;