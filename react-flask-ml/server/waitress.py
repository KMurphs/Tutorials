from waitress import serve
import run

serve(run, listen='*:8080')