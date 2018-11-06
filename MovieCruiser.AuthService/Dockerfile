FROM microsoft/dotnet:2.1-sdk AS build-env
WORKDIR /app

# Copy csproj
COPY *.csproj ./
RUN dotnet restore

# Copy everything else
COPY . ./
RUN dotnet publish -c Release -o out

#Build runtime image
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet","MovieCruiser.AuthService.dll"]