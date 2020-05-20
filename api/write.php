<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
    
    
    //$current_datetime = date('Y-m-d H:i:s');
    $filepath = "train_log.txt";
	//If correct HTTP method and all required fields
	if(
		isset($_POST)
	) {
		
        try {
            if(!is_file($filepath)){
                file_put_contents($filepath, "");
            }

            /*$record = array(
                $current_datetime => $_POST["data"]
            );*/

            $file = fopen($filepath, 'a');

            flock($file, LOCK_EX);
            
            fwrite($file, json_encode($_POST["data"]));
            fwrite($file, PHP_EOL);

            fflush($file);

            flock($file, LOCK_UN);

            fclose($file);

            // set response code - 200 OK
            http_response_code(200);
        } catch (Exception $e) {
			ExceptionLogger::logException($MESSAGE_SERVER_ERROR, $e, $_POST);

			http_response_code(503);
			echo json_encode(array("message" => $MESSAGE_SERVER_ERROR));
		}
			
	}
		
	// Incomplete data
	else {
        //Missing arguments
        // set response code - 422 - based on https://stackoverflow.com/questions/3050518/what-http-status-response-code-should-i-use-if-the-request-is-missing-a-required
		http_response_code(422);
	}
?>