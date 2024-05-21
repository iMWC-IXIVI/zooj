FROM golang:1.22-alpine

WORKDIR /usr/src/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go install github.com/pressly/goose/v3/cmd/goose@latest
RUN go build -v -o ./build ./...
EXPOSE 8080

CMD ["./build/cmd"]