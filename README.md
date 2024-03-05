# Requirements

Bun min. v1.0.0

## Development

To start the development server run:

```bash
bun install
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## `PRODUCTION` *Docker* image

### Build a ***Docker `image`***

A self-contained template containing all the dependencies and configuration required to run the application.

The initial build will take longer, as Docker will download all the base images and dependencies.

```bash
# [build] - convert a Dockerfile into a Docker image
# [--pull] - automatically download the latest version of the base image (oven/bun)
# [-t fitex:prod] - specify a name for the image
# [.] - path to the Dockerfile
bun run docker:build # docker build --pull -t fitex:prod .
```

We've built a new Docker `image` named `fitex:prod`.
___

### 2 - Start a ***Docker `container`***

Now let's use that `image` to spin up an actual, running `container`.

We'll use `bun run docker:run` to start a new `container` using the `fitex:prod` `image`.

```bash
# [run] - start a new container using the `fitex:prod` image
# [-d] - run container in detached mode in the background (return you to the terminal prompt)
# [-p 3000:3000] - map the container's port 3000 to our local machine's port 3000
# [fitex:prod] - name of the image to start
bun run docker:run # docker run -d -p 3000:3000 fitex:prod
```

The run command prints a string representing the `container` `ID`.

The `container` is now running in the *background*. Visit [localhost:3000](localhost:3000) to see an app.
___


### 3 - Stop

To stop the `containers`, we'll use `bun run docker:stop`.

```bash
# [stop] stop running container
# [$(bun run docker:ps)] - print Fitex containers IDs
bun run docker:stop # docker stop $(bun run docker:ps)
```

Cleanup `containers` using `bun run docker:rm`.

```bash
# [rm] - remove one or more containers
# [$(bun run docker:ps)] - print Fitex containers IDs
bun run docker:rm # docker rm $(bun run docker:ps)
```

You can use `bun run docker:ps` to list all `running` `containers`. Use `bun run docker:ps:v` for verbose output.

```bash
# [ps] - list containers
# [-a] - show all containers (default shows just running)
# [-q] - only display container IDs
# [-f ancestor=fitex:prod] - filter output based on conditions provided
bun run docker:ps # docker ps -a -q -f ancestor=fitex:prod
```