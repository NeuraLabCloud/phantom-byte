/**
 * Wait for a given amount of time
 * @param time to wait in milliseconds
 * @returns a promise that resolves after the given time
 */
export async function wait(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}