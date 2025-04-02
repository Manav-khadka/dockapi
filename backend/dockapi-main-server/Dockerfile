FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven wrapper files if using mvnw
COPY mvnw mvnw.cmd ./
COPY .mvn .mvn/

# Copy the Maven build file
COPY pom.xml ./

# Copy the source code
COPY src ./src

# Install Maven dependencies
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Build the application
RUN ./mvnw package -DskipTests

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/dockapi-main-server-0.0.1-SNAPSHOT.jar"]
