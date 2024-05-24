FROM golang:1.22-alpine as compiling_stage

WORKDIR /usr/src/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go install github.com/pressly/goose/v3/cmd/goose@latest
RUN go build -v -o ./build ./...

FROM alpine:latest

WORKDIR /root/

RUN apk add --no-cache libc6-compat

COPY --from=compiling_stage /usr/src/app/build .

ENTRYPOINT ["./cmd"]
EXPOSE 8080