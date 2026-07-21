FROM alpine:latest AS base

FROM base AS builder

ARG PB_VERSION=0.39.8

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    openssh

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

FROM base AS runner
COPY --from=builder /pb /pb

EXPOSE 8080

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
