export const formatApiResponse = (status, data, message, error) => {
    return {
        'statusCode': status,
        'data': data,
        'message': message,
        'error': error
    }
}