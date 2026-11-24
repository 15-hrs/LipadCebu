# React client

The React homepage is built with Vite into `wwwroot/dist`. Install the client dependencies once after cloning:

```powershell
cd ClientApp
npm ci
cd ..
dotnet run
```

The ASP.NET Core build runs the Vite production build automatically. To build the client separately, run `npm run build` from `ClientApp`.
