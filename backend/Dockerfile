FROM gradle:7.4.2-jdk17 AS build
COPY --chown=gradle:gradle . src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test

FROM openjdk:17

EXPOSE 5000

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar

ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]