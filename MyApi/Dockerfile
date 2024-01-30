# Use the .NET 6.0 SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY MyApi.csproj ./
RUN dotnet restore "MyApi.csproj"

# Copy everything else and build
COPY . ./
RUN dotnet publish "MyApi.csproj" -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "MyApi.dll"]

