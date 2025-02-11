list buckets

`aws s3 ls`

create a bucket
`aws s3 mb bucket-name`

update a bucket policy

````aws s3api put-bucket-policy --bucket your-bucket-name --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}'```
````

sync local directory
`aws s3 sync directory bucket`

enable static website hosting
`aws s3 website configuration`
