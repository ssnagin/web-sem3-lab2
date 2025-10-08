plugins {
    kotlin("jvm") version "2.1.10"
}

group = "com.ssnagin"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))

    implementation(kotlin("stdlib"))

    // Jakarta Servlet API
    implementation("jakarta.servlet:jakarta.servlet-api:6.0.0")

    // Jakarta Persistence (JPA)
    implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")

    // Jakarta REST (JAX-RS)
    implementation("jakarta.ws.rs:jakarta.ws.rs-api:3.1.0")

    // Jakarta JSON Processing
    implementation("jakarta.json:jakarta.json-api:2.1.1")

}

tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(21)
}